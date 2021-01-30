import AWS = require('aws-sdk')

export const deleteMediaLiveChannel = async (
  channelId: string
): Promise<AWS.MediaLive.Types.DeleteChannelResponse> => {
  const medialive = new AWS.MediaLive({ apiVersion: '2017-10-14' })

  const params: AWS.MediaLive.Types.DeleteChannelRequest = {
    ChannelId: channelId
  }

  const result = await medialive.deleteChannel(params).promise()

  return result
}
