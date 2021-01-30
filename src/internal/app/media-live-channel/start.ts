import AWS = require('aws-sdk')

export const startMediaLiveChannel = async (channelId = ''): Promise<AWS.MediaLive.Types.StartChannelResponse> => {
  const medialive = new AWS.MediaLive({ apiVersion: '2017-10-14' })

  const params = {
    ChannelId: channelId
  }
  const result = await medialive.startChannel(params).promise()

  return result
}
