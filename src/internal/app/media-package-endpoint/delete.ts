import AWS = require('aws-sdk')

export const deleteMediaPackageEndpoint = async (channelName: string) => {
  const endPointName = channelName + 'Endpoint'

  const mediaPackage = new AWS.MediaPackage()

  const params: AWS.MediaPackage.Types.DeleteOriginEndpointRequest =
        {
          Id: endPointName

        }

  const result = await mediaPackage.deleteOriginEndpoint(params).promise()

  return result
}
