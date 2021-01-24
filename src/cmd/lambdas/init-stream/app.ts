import {newMediaPackageChannel} from "@/internal/app/media-package-channel/create";
import {SsmParameterType, createSsmParamter} from "@/internal/app/ssm/create";
import {newMediaPackageEndpoint} from "@/internal/app/media-package-endpoint/create";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {newMediaLiveChannel} from "@/internal/app/media-live-channel/create";
import {newSecurityGroup} from "@/internal/app/security-group/create";
import {newMediaLiveInput} from "@/internal/app/media-live-input/create";
import {startMediaLiveChannel} from "@/internal/app/media-live-channel/start";

let response

function getSsmParamName(channelName: string, ingest: AWS.MediaPackage.IngestEndpoint): string {
    return '/livestream/' + channelName + '/ingest/' + ingest.Id + '/Password';
}

/**
 * Hello World
 */
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log('A')
        const channelName = event.pathParameters?.id ?? 'defaultChannelName'

        console.log('B')
        const mediaPackageChannel = await newMediaPackageChannel(channelName)

        console.log('C')
        const ingestEPs = mediaPackageChannel.HlsIngest?.IngestEndpoints ?? []

        if (ingestEPs.length == 0) {
            throw new Error()
        }

        console.log('D')
        const EP = ingestEPs[0]

        console.log('E')
        await createSsmParamter(getSsmParamName(channelName, EP), EP.Password ?? '', SsmParameterType.secure);

        console.log('F')
        const endpoint = await newMediaPackageEndpoint(channelName)

        console.log('G')
        // const mediaLiveChannel = await newMediaLiveChannel(channelName, EP.Url ?? '', EP.Username ?? '', getSsmParamName(channelName, EP))

        console.log('H')
        const securityGroup = await newSecurityGroup()

        console.log('I')
        console.log(securityGroup.SecurityGroup?.Id)

        console.log('J')
        const mediaLiveInput = await newMediaLiveInput(channelName, securityGroup.SecurityGroup?.Id)

        console.log('K')
        const mediaLiveChannel = await newMediaLiveChannel(channelName, mediaLiveInput, EP.Url ?? '', EP.Username ?? '', getSsmParamName(channelName, EP))

        console.log(mediaLiveChannel.Channel?.Id)

        await new Promise(r => setTimeout(r, 10000));

        // const result = await startMediaLiveChannel(mediaLiveChannel.Channel?.Id)

        // console.log(result)

        console.log('L')

        const deletePayload = {
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
                deletePayload: deletePayload

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
