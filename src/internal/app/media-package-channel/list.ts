import AWS = require('aws-sdk')

export const listMediaPackageChannels = async (): Promise<AWS.MediaPackage.Types.ListChannelsResponse> => {
  const mediaPackage = new AWS.MediaPackage()

  const params: AWS.MediaPackage.Types.ListChannelsRequest = {}

  const channels = await mediaPackage.listChannels(params, function (err: Error, data: any) {
    if (err != null) console.log(err, err.stack)
    else return data
  }).promise()

  return channels
}
