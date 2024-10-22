# SmartDevicesNetwork UI

This project provides visualization of network nodes

## Docker Image build:

```
docker build --build-arg API_BASE_URL='http://localhost:9010' -t smart-devices-network-ui .
```

## Docker Image run:

```
docker run -p 9001:9001 smart-devices-network-ui
```
