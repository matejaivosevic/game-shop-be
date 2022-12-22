const AWS = require('aws-sdk');
const BUCKET = 'game-product-img'

module.exports = {
    imagesList: async function() {
        const s3 = new AWS.S3({ region: 'us-east-1' });
        let statusCode = 200;
        let body = {};
        let images: any = {};
        const params = {
            Bucket: BUCKET,
            Prefix: ''
        };

        try {
            const s3Response = await s3.listObjectsV2(params).promise();
            images = s3Response.Contents;
            body = JSON.stringify(
                images.filter(image => image.Size).map(image => `https://${ BUCKET }.s3.amazonaws.com/${ image.Key }`)
            );
        } catch (error) {
            console.error('Error appears: ');
            console.error(error);
            statusCode = 500;
            body = error;
        }

        return {
            statusCode,
            headers: { 'Access-Control-Allow-Origin' : '*' },
            body
        }
    },
    imageUpload: async function(event) {
        const s3 = new AWS.S3({ region: 'us-east-1' });

        for (const record of event.Records) {
            await s3.copyObject({
                Bucket: BUCKET,
                CopySource: BUCKET + '/' + record.s3.object.key,
                Key: record.s3.object.key
            }).promise();

            await s3.deleteObject({
                Bucket: BUCKET,
                Key: record.s3.object.key
            }).promise();

            return {
                statusCode: 202
            }
        }
    }
}