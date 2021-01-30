import AWS = require('aws-sdk')

export const deleteMediaPackageChannel = async (id: string): Promise<AWS.MediaPackage.Types.DeleteChannelResponse> => {
  const mediaPackage = new AWS.MediaPackage()

  const params: AWS.MediaPackage.Types.DeleteChannelRequest = {
    Id: id
  }
  const result = await mediaPackage.deleteChannel(params).promise()

  return result
}
