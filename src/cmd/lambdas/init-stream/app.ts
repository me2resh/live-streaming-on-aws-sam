import { newMediaPackageChannel } from '@/internal/app/media-package-channel/create'
import { createSsmParamter, SsmParameterType } from '@/internal/app/ssm/create'
import { newMediaPackageEndpoint } from '@/internal/app/media-package-endpoint/create'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { newMediaLiveChannel } from '@/internal/app/media-live-channel/create'
import { newSecurityGroup } from '@/internal/app/security-group/create'
import { newMediaLiveInput } from '@/internal/app/media-live-input/create'

let response

function getSsmParamName (channelName: string, ingest: AWS.MediaPackage.IngestEndpoint): string {
  return '/livestream/' + channelName + '/ingest/' + ingest.Id + '/Password'
}

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const channelName = event.pathParameters?.id ?? 'defaultChannelName'

    const mediaPackageChannel = await newMediaPackageChannel(channelName)

    const ingestEPs = mediaPackageChannel.HlsIngest?.IngestEndpoints ?? []

    if (ingestEPs.length == 0) {
      throw new Error()
    }

    const EP = ingestEPs[0]

    await createSsmParamter(getSsmParamName(channelName, EP), EP.Password ?? '', SsmParameterType.secure)

    const endpoint = await newMediaPackageEndpoint(channelName)

    const securityGroup = await newSecurityGroup()

    const mediaLiveInput = await newMediaLiveInput(channelName, securityGroup.SecurityGroup?.Id)

    const mediaLiveChannel = await newMediaLiveChannel(channelName, mediaLiveInput, EP.Url ?? '', EP.Username ?? '', getSsmParamName(channelName, EP))

    const creationPayload = {
      mediaPackageChannelId: mediaPackageChannel.Id,
      mediaPackageEndPointId: EP.Id,
      ssmParamKey: getSsmParamName(channelName, EP),
      securityGroupId: securityGroup.SecurityGroup?.Id,
      mediaLiveInput: mediaLiveInput.Input?.Id,
      mediaLiveChannel: mediaLiveChannel.Channel?.Id
    }
    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        preview: endpoint.Url,
        input: mediaLiveInput.Input?.Destinations,
        creationPayload: creationPayload

      })
    }
  } catch (err) {
    response = {
      statusCode: 500,
      body: err.message
    }
  }

  return response
}

export default {
  lambdaHandler
}
