import AWS = require('aws-sdk')

export const newMediaPackageChannel = async (channelName: string): Promise<AWS.MediaPackage.CreateChannelResponse> => {
  const mediaPackage = new AWS.MediaPackage()

  const params: AWS.MediaPackage.Types.CreateChannelRequest = {
    Id: channelName,
    Description: 'new awesome streaming channel',
    Tags: {}
  }

  const channel = await mediaPackage.createChannel(params, function (err: Error, data: any) {
    if (err != null) console.log(err, err.stack)
    else return data
  }).promise()

  return channel
}
