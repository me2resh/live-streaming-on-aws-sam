import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { stopMediaLiveChannel } from '@/internal/app/media-live-channel/stop-channel';
import { deleteMediaLiveInput } from '@/internal/app/media-live-input/delete';
import { deleteSecurityGroup } from '@/internal/app/security-group/delete';
import { updateMediaLiveInput } from '../../../internal/app/media-live-input/update';
import { v4 as uuidv4 } from 'uuid';

let response: any;

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event.body);

  const input = event.body ?? '{}';

  const payload = JSON.parse(input);

  await stopMediaLiveChannel(payload.mediaLiveChannelId);

  await new Promise((r) => setTimeout(r, 28000));

  await updateMediaLiveInput(payload.mediaLiveInputId, uuidv4());

  try {
    console.log(event.body);

    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: event.body,
    };
  } catch (err) {
    response = {
      statusCode: 500,
      body: err.message,
    };
  }

  return response;
};

export default {
  lambdaHandler,
};
