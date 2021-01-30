import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { stopMediaLiveChannel } from '@/internal/app/media-live-channel/stop-channel'
import { deleteMediaLiveInput } from '@/internal/app/media-live-input/delete'
import { deleteSecurityGroup } from '@/internal/app/security-group/delete'

let response: any

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event.body)

  const input = event.body ?? '{}'

  const payload = JSON.parse(input)

  await stopMediaLiveChannel(payload.mediaLiveChannel)

  await deleteMediaLiveInput(payload.mediaLiveInput)

  await new Promise(r => setTimeout(r, 2000))

  await deleteSecurityGroup(payload.securityGroupId)

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
