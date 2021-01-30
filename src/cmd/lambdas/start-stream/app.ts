import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { startMediaLiveChannel } from '@/internal/app/media-live-channel/start';
import { updateMediaLiveInput } from '@/internal/app/media-live-input/update';
import { newMediaPackageEndpoint } from '@/internal/app/media-package-endpoint/create';
import { deleteMediaPackageEndpoint } from '@/internal/app/media-package-endpoint/delete';

let response;

function getSsmParamName(
  channelName: string,
  ingest: AWS.MediaPackage.IngestEndpoint
): string {
  return '/livestream/' + channelName + '/ingest/' + ingest.Id + '/Password';
}

/**
 * Hello World
 */
export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const input = event.body ?? '{}';

    const payload = JSON.parse(input);

    const mediaLiveInputId = payload.mediaLiveInputId;
    const streamName = payload.streamName;
    const channelName = payload.channelName;
    const mediaLiveChannelId = payload.mediaLiveChannelId;

    await deleteMediaPackageEndpoint(channelName);

    await new Promise((r) => setTimeout(r, 2000));

    const endpoint = await newMediaPackageEndpoint(channelName);

    const mediaLiveInput = await updateMediaLiveInput(
      mediaLiveInputId,
      streamName
    );

    const result = await startMediaLiveChannel(mediaLiveChannelId);

    console.log(result);

    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        preview: endpoint.Url,
        input: mediaLiveInput.Input?.Destinations,
      }),
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
