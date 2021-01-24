import AWS = require('aws-sdk');

export const newSecurityGroup = async (): Promise<AWS.MediaLive.Types.CreateInputSecurityGroupResponse> => {

    var medialive = new AWS.MediaLive({apiVersion: '2017-10-14'})

    const params: AWS.MediaLive.Types.CreateInputSecurityGroupRequest = {
        WhitelistRules: [
            {
                Cidr: '0.0.0.0/0'
            }
        ]
    }

    const securityGroup = await medialive.createInputSecurityGroup(params).promise()

    return securityGroup

}