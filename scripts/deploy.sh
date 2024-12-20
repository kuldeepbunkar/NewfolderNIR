#!/bin/bash

# Environment variables
ENV=$1
DOCKER_REGISTRY="your-registry.azurecr.io"
APP_NAME="next-innovation"

# Validate environment
if [ "$ENV" != "staging" ] && [ "$ENV" != "production" ]; then
  echo "Invalid environment. Use 'staging' or 'production'"
  exit 1
fi

# Build and tag Docker image
echo "Building Docker image for $ENV..."
docker build -t $APP_NAME:$ENV .

# Login to container registry
echo "Logging into container registry..."
az acr login --name $DOCKER_REGISTRY

# Tag and push image
echo "Pushing image to registry..."
docker tag $APP_NAME:$ENV $DOCKER_REGISTRY/$APP_NAME:$ENV
docker push $DOCKER_REGISTRY/$APP_NAME:$ENV

# Deploy to Kubernetes
echo "Deploying to Kubernetes..."
kubectl config use-context $ENV
kubectl set image deployment/$APP_NAME $APP_NAME=$DOCKER_REGISTRY/$APP_NAME:$ENV

# Verify deployment
echo "Verifying deployment..."
kubectl rollout status deployment/$APP_NAME

echo "Deployment completed successfully!" 