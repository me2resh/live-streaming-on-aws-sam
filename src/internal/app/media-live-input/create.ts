import AWS = require('aws-sdk')

export const newMediaLiveInput = async (channelName: string, securityGroup = ''): Promise<AWS.MediaLive.Types.CreateInputResponse> => {
  const medialive = new AWS.MediaLive({ apiVersion: '2017-10-14' })

  const name = channelName + 'medialiveInput'

  const params: AWS.MediaLive.Types.CreateInputRequest = {
    Name: name,
    Type: 'RTMP_PUSH',
    InputSecurityGroups: [securityGroup],
    Destinations: [{
      StreamName: channelName + '/live'
    }]
  }

  const mediaLiveInput = await medialive.createInput(params).promise()

  return mediaLiveInput
}
