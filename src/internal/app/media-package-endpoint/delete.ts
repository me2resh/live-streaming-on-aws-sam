import AWS = require('aws-sdk');

export const deleteMediaPackageEndpoint = async (id: string) => {


    const mediaPackage = new AWS.MediaPackage()

    const params: AWS.MediaPackage.Types.DeleteOriginEndpointRequest =
        {
            Id: id

        }

    const result = await mediaPackage.deleteOriginEndpoint(params).promise()

    return result

}