const firebase = require('./firebase-config');

async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

(async () => {
  const db = firebase.firestore();

  let res;
  
  res = await deleteCollection(db, 'profiles');
  console.log('Outcome: ', res);

  let profile = {};

  profile.first_name = 'Lukáš';
  profile.last_name = 'Čech';
  profile.job_title = 'Digital Analytics Heavy Lifter';
  
  profile.features = [
    {
      title: 'Strengths',
      items: [
        { title: 'Adobe Analytics', level: 5 },
        { title: 'Tag Management', level: 5 },
        { title: 'Cookies Consent Management', level: 4 },
        { title: 'JavaScript', level: 3 },
        { title: 'Node.js', level: 2 }
      ]
    }, {
      title: 'Experiences',
      items: [
        {
          title: 'Československá obchodní banka',
          details: 'Digital Analytics Architect & Developer',
        },
        {
          title: 'Polish Airlines LOT',
          details: 'Digital Analytics Consultant & Developer',
        },
        {
          title: 'České aerolinie',
          details: 'Digital Analytics Consultant & Developer',
        },
        {
          title: 'Equa bank',
          details: 'Digital Analytics Architect & Developer'
        },
        {
          title: 'O2 Czech Republic',
          details: 'Digital Analytics Consultant & Developer',
        }
      ]
    }, {
      title: 'Hobbies',
      items: [
        {title: 'Bicycling', details: 'Mountain', level: 5},
        {title: 'Snowboarding', details: 'Freeride', level: 3},
        {title: 'Swimming', level: 2},
        {title: 'Hiking', level: 2},
        {title: 'Canoing', level: 2}
      ]
    }
  ];

  profile.uid = 'L17gtZfr8AZyM4A32n32Iubaoxu2';
  res = await db.collection('profiles').add(profile);
  console.log('Added document with ID: ', res.id);

  profile.uid = 'JBUxQSGqNENcNpcD9hGwmitbMwT2';
  res = await db.collection('profiles').add(profile);
  console.log('Added document with ID: ', res.id);
  
  let user
  
  user = {
    admin: true
  };
  res = await db.collection('users').doc('L17gtZfr8AZyM4A32n32Iubaoxu2').set(user);
  console.log('Added document: ', res);

  user = {
    admin: false
  };
  res = await db.collection('users').doc('JBUxQSGqNENcNpcD9hGwmitbMwT2').set(user);
  console.log('Added document: ', res);

})().then(() => {
  console.log('Success');
})
.catch(err => {
  console.log('Error', err);
})
.finally(() => {
  process.exit(0);
});

/*
    const ref = firebase.firestore().collection('profiles').doc('9z8eZvtRLmrkChWKpdiz');
    let doc = await ref.get();
    if (doc.exists) {
      profile = doc.data();
    } else {
      throw('No such document!');
    }
*/