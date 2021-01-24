import AWS = require('aws-sdk');

export const deleteSecurityGroup = async (id: string): Promise<AWS.MediaLive.Types.DeleteInputSecurityGroupResponse> => {

    var medialive = new AWS.MediaLive({apiVersion: '2017-10-14'})


    const params: AWS.MediaLive.Types.DeleteInputSecurityGroupRequest = {
        InputSecurityGroupId: id
    }

    const result = await medialive.deleteInputSecurityGroup(params).promise();

    return result


}