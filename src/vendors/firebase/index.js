const { Firestore, FieldValue } = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "homehub-c2f7c",
  credentials: {
    client_email:
      "firebase-adminsdk-90lpn@homehub-c2f7c.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCC8tnP12vXm+rS\nHul4xKDgO3HNq6CqMpqeaI88vSWYZ2Zz+bggX1ziX5R29MVTsit6tQnWShxLrLbh\ny8f2GmtWk+wn9CM1hhShNtY73YdEYM7zDS1X+wAN0cfMFoqmMaUajRGcHPxQWTSo\nDm6L897t1b5UOvFUN2c1SPj6dRA9zD/sjgsDsAPATFDkBekTSLCmWDJPsg0cWzqv\naqyzjy9Zhoi/mi6hOFDFFV7qMOQ3fXYqwHuYWs0l8jYMlmdns85IhvMgTjCttwFO\n9A+rxz6AgcAcUpjpOE+Mv8d4kJEF9Ypn1rrsN88wXTA46LP6FDqTx4nhsqLaKNdG\nTiLxcVtVAgMBAAECggEABXxZ/piGNoqcHEBaRIpsOOiUnGqfuPGUw6Uatw8vd4KB\nasNf4M9N61fYtuELMTXqF2JlLpp9M/hg0vXAA0HZFE/vGT9jiDb9P0G2WNyvcYBi\nuxDmwORNfMa4iYa6OTskMQgO4EzgjxclmxK7s9Y8FReauRmdCYumobdUYt2rmAMa\npTOaP6kB9IaP4OKx5uY008YlP2vvOPJjyL7GDbNGkLZrxCnGMXmyMdc/EV+Zk9QF\nGh6ietzgepbppeY8gdq5MgJYCWcGeRt6f+WvRC0rJmGyyBT4Y6DS/2j8/aSPpE5d\n/wVTkljmT7DxAOhlw4EmPp4zg119HgZtgpKtl0BaowKBgQC4JNkwV+YyEvwW1U6v\nSE3KmKBLk5CXyHoTEBcbd5441oLzYYiLXINZkVmfwr6R62JYudmhW8mptbnJ4A5S\ny4TyAkE3P5s0qUA5GCBPHFp2nA3R0z4DjuRBui2I9DrtTIxSI/62AJgwjXt3xTuv\niPZgPnywUTucsTUXoJRUiiiVfwKBgQC2DAfkY/eLUlpOV8PhS8ktwnkxaqpfeR6s\nh0OkNi0UiYrVynXvPRI9aTbKPSgarysE/4rP1xWy5Yfj9nYL7hNxNZQB7V/eljVE\nwJ+1AtHfenL7r7fPD7axoSdNnDM0xuJErUWqOZPnH+XOGTE4exoNo4daR9/stAVG\nbkZm9NVBKwKBgQCCGz79ok16OeG1vFcRD9Qu/jHb1FKIe9SM3YSGGrlHTYFOty4D\n0YTY5xLdB3sgnKBrMj0rfi/5YfX4Rf+4ziWL3L35bE6cIa3H6V0CqHTecxpsk4Ww\ne+iY7BO6PV3ZRomqi9YvADKHs592G3w1ZV8210/AQFUPPEHYBNRo+wj7vwKBgQCA\nMQaZsD9PbyVCR5Eao+g9fdUjlC323u5XpURfbPrfnF8UXuYfGk0uy1kWnmwQJktP\n0Lap1pZkDDddsl671eEA9i6MEOBSeEl4aX/M0fiButMfIkR33WPTv1xSzWxNfMM2\ngyEsVjEtLov/TkQXtq/I7N9SFoy7PKT+TIbs1vkYUwKBgBv/ajqVyzd13QBMQzI4\nZqfsDNVXFRivEmbX3r8myR+Z7beCPfn/fXSGruugsV3s2Yti6sqKDiUrN5tY2Goc\nlmk+DcWxamK9S9C9yZNbxZTBNFwfx+cG1a9ib0FCfhf2nYRkdNt8aM36jEIrtZZf\ng89EiHhVaXSs3Dlgso36ubQZ\n-----END PRIVATE KEY-----\n",
  },
});

db.settings({ ignoreUndefinedProperties: true });

export { db, FieldValue };
