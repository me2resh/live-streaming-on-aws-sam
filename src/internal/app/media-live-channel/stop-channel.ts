import AWS = require('aws-sdk');


export const stopMediaLiveChannel = async (channelId: string = ''): Promise<AWS.MediaLive.Types.StopChannelResponse> => {

    var medialive = new AWS.MediaLive({apiVersion: '2017-10-14'})

    const params: AWS.MediaLive.Types.StopChannelRequest = {
        ChannelId: channelId
    }
    const result = await medialive.stopChannel(params).promise()

    return result

}