import AWS = require('aws-sdk')

export const listMediaLiveChannels = async (): Promise<AWS.MediaLive.Types.ListChannelsResponse> => {
  const medialive = new AWS.MediaLive({ apiVersion: '2017-10-14' })

  const mediaLiveChannelParams: AWS.MediaLive.Types.ListChannelsRequest = {}

  const channels = await medialive.listChannels(mediaLiveChannelParams).promise()

  return channels
}
