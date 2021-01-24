import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {stopMediaLiveChannel} from "@/internal/app/media-live-channel/stop-channel";

let response: any


/**
 * Hello World
 */
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log(event.body)

    const input = event.body ?? '{}'

    const payload = JSON.parse(input)

    await stopMediaLiveChannel(payload.mediaLiveChannel)
    console.log('stopMediaLiveChannel')


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
