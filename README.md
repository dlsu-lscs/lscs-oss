# LSCS Object Storage Service (OSS)
A lightweight drop-in Object Storage Service for storing images remotely from your main server.

## `POST /upload`
Post example:
```json
{
  "type": "", // OPTIONAL, either "default" or "message". "message" is used for images used in DMs
}
```
Use form upload or however it is react to select an image.

Response example:
```json
{
  "status": "success",
  "image": "<FULL_IMAGE_URL>",
  "thumbnail": "<THUMBNAIL_IMAGE_URL>"
}
```
The response links are direct links to the images.

## GET `/{image-id}` | GET `/{image-id}?type=thumbnail`

Response: Direct link to image.
