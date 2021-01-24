import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {deleteMediaLiveChannel} from "@/internal/app/media-live-channel/delete";
import {deleteMediaLiveInput} from "@/internal/app/media-live-input/delete";
import {deleteSecurityGroup} from "@/internal/app/security-group/delete";
import {deleteMediaPackageEndpoint} from "@/internal/app/media-package-endpoint/delete";
import {deleteSsmParamter} from "@/internal/app/ssm/delete";
import {deleteMediaPackageChannel} from "@/internal/app/media-package-channel/delete";
import {stopMediaLiveChannel} from "@/internal/app/media-live-channel/stop-channel";

let response: any

class DeletePayload {
    constructor(public mediaPackageChannelId: string,
                public mediaPackageEndPointId: string,
                public ssmParamKey: string,
                public securityGroupId: string,
                public mediaLiveInput: string,
                public mediaLiveChannel: string) {
    }
}

function getSsmParamName(channelName: string, ingest: AWS.MediaPackage.IngestEndpoint): string {
    return '/livestream/' + channelName + '/ingest/' + ingest.Id + '/Password';
}


/**
 * Hello World
 */
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log(event.body)

    const input = event.body ?? '{}'


    const payload = JSON.parse(input)


    await stopMediaLiveChannel(payload.mediaLiveChannel)
    console.log('stopMediaLiveChannel')

    await new Promise(r => setTimeout(r, 2000));


    await deleteMediaLiveChannel(payload.mediaLiveChannel)
    console.log('deleteMediaLiveChannel')



    await new Promise(r => setTimeout(r, 2000));
    await deleteMediaPackageEndpoint(payload.mediaPackageEndPointId)
    console.log('deleteMediaPackageEndpoint')

    await new Promise(r => setTimeout(r, 2000));

    await deleteSsmParamter(payload.ssmParamKey)
    console.log('deleteSsmParamter')


    await new Promise(r => setTimeout(r, 2000));
    await deleteMediaPackageChannel(payload.mediaPackageChannelId)
    console.log('deleteMediaPackageChannel')


    await new Promise(r => setTimeout(r, 10000));

    await deleteMediaLiveInput(payload.mediaLiveInput)
    console.log('deleteMediaLiveInput')

    await new Promise(r => setTimeout(r, 2000));

    await deleteSecurityGroup(payload.securityGroupId)
    console.log('deleteSecurityGroup')


    try {

        console.log(event.body)

        response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: event.body
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
