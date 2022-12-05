const moment = require('moment');
const express = require('express');
const app = express();

function toFortniteISO(time) {
  return moment(time).format('YYYY-MM-DDTHH:mm:ss.SSSZ').replace(' ', 'T');
}

app.post('/account/api/oauth/token', (req, res) => {
  res.json({
    "access_token": "ACCESS_TOKEN",
    "expires_in": 28800,
    "expires_at": toFortniteISO(moment().add(8, 'hours')),
    "token_type": "bearer",
    "refresh_token": "REFRESH_TOKEN",
    "refresh_expires": 86400,
    "refresh_expires_at": toFortniteISO(moment().add(24, 'hours')),
    "account_id": "ACCOUNT_ID",
    "client_id": "CLIENT_ID",
    "internal_client": true,
    "client_service": "fortnite",
    "displayName": "Oli",
    "app": "fortnite",
    "in_app_id": "ACCOUNT_ID",
    "device_id": "DEVICE_ID"
  });
});

app.get('/waitingroom/api/waitingroom', (req, res) => {
  res.sendStatus(204);
});

app.delete('account/api/oauth/sessions/kill', (req, res) => {
  res.sendStatus(204);
});

app.get('/account/api/public/account/:account_id', (req, res) => {
  res.json({
    "id": req.params.account_id,
    "displayName": "Oli",
    "name": 'PARTYSERVER',
    "email": "PARTYSERVER@gmail.com",
    "failedLoginAttempts": 0,
    "lastLogin": "2020-05-11T21:14:12.698Z",
    "numberOfDisplayNameChanges": 0,
    "ageGroup": "UNKNOWN",
    "headless": false,
    "country": "GB",
    "lastName": "PARTYSERVER",
    "preferredLanguage": "en",
    "canUpdateDisplayName": true,
    "tfaEnabled": false,
    "emailVerified": true,
    "minorVerified": false,
    "minorExpected": false,
    "minorStatus": "UNKNOWN"
  });
});

app.get('/account/api/public/account/:account_id/externalAuths', (request, response) => {
    response.json([], 200);
  });
  
  app.post('/fortnite/api/game/v2/tryPlayOnPlatform/account/:account_id', (request, response) => {
    response.send(true, 200);
  });
  
  app.get('/lightswitch/api/service/bulk/status', (request, response) => {
    response.json([
      {
        "serviceInstanceId": "fortnite",
        "status": "UP",
        "message": "Up",
        "maintenanceUri": null,
        "overrideCatalogIds": [
          "a7f138b2e51945ffbfdacc1af0541053"
        ],
        "allowedActions": [
          "PLAY",
          "DOWNLOAD"
        ],
        "banned": false,
        "launcherInfoDTO": {
          "appName": "Fortnite",
          "catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
          "namespace": "fn"
        }
      }
    ], 200);
  });
  
  app.get('/fortnite/api/game/v2/enabled_features', (request, response) => {
    response.json([], 200);
  });
  
  app.get('/fortnite/api/cloudstorage/user/:account_id', (request, response) => {
    response.json([], 200);
  });
  
  app.post('/fortnite/api/game/v2/profile/:account_id/client/:command', (request, response) => {
    console.log(request.query);
  
    const responses = {
      "profileRevision": 1,
      "profileId": request.query.profileId[0],
      "profileChangesBaseRevision": 1,
      "profileChanges": [],
      "profileCommandRevision": 1,
      "serverTime": new Date(),
      "responseVersion": 1
    };
  
    if (command === "RefreshExpeditions") {
      responses(response, 200);
    } else if (command === "QueryProfile") {
      responses(response, 200);
    } else if (command === "ClientQuestLogin") {
      responses(response, 200);
    } else {
      throw new Error(`Command you haven't setup: ${request.url}.`);
      process.exit();
    }
  });
  
  app.listen(80, () => {
    console.log('Listening on port 80');
  });