call sam package --template-file template.json --output-template-file packagedTemplate.json --s3-bucket example --s3-prefix PackagingAssets --use-json
call sam deploy --template-file packagedTemplate.json --s3-bucket example --s3-prefix DeploymentAssets --stack-name swgoh-api --tags project=swgoh