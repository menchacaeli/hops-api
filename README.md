# hops-api
node express api for react native hops application

Before running against development, or running npm run start, you will need to
build the bundle.
1. npm run build
2. npm run dev

You will now have Nodemon to listen to your changes instead of having to constantly restart the server.


###
    Deploying to Google Cloud
###
<span>
There's a built in script to deploy to google cloud, which is contained in the package.json file.
 ** This assumes that you have your gcloud SDK configured on your machine.
</span>
<b>npm run deploy</b>