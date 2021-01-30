import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { listMediaLiveChannels } from '@/internal/app/media-live-channel/list'

let response

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const activeChannels = await listMediaLiveChannels()

    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channels: activeChannels
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
