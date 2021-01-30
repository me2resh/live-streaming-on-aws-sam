import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { startMediaLiveChannel } from '@/internal/app/media-live-channel/start'
import { updateMediaLiveInput } from '@/internal/app/media-live-input/update'
import { newMediaPackageEndpoint } from '@/internal/app/media-package-endpoint/create'
import { deleteMediaPackageEndpoint } from '@/internal/app/media-package-endpoint/delete'

let response

function getSsmParamName (channelName: string, ingest: AWS.MediaPackage.IngestEndpoint): string {
  return '/livestream/' + channelName + '/ingest/' + ingest.Id + '/Password'
}

/**
 * Hello World
 */
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const input = event.body ?? '{}'

    const payload = JSON.parse(input)

    const mediaLiveInputId = payload.mediaInputId
    const streamName = payload.streamName
    const channelName = payload.channelName
    const channelId = payload.channelId

    await deleteMediaPackageEndpoint(channelName)

    const endpoint = await newMediaPackageEndpoint(channelName)

    console.log('J')
    const mediaLiveInput = await updateMediaLiveInput(mediaLiveInputId, streamName)

    console.log('K')

    const result = await startMediaLiveChannel(channelId)

    console.log(result)

    console.log('L')

    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        preview: endpoint.Url,
        input: mediaLiveInput.Input?.Destinations
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
