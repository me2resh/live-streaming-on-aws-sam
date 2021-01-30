import AWS = require('aws-sdk')

export const updateMediaLiveInput = async (inputId: string, streamName: string): Promise<AWS.MediaLive.Types.UpdateInputResponse> => {
  const medialive = new AWS.MediaLive({ apiVersion: '2017-10-14' })

  const params: AWS.MediaLive.Types.UpdateInputRequest = {
    InputId: inputId,
    Destinations: [{
      StreamName: streamName + '/live'
    }]
  }

  const newMediaLiveInput = await medialive.updateInput(params).promise()

  return newMediaLiveInput
}
