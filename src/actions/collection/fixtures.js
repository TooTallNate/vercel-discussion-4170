export const collectionsResponse = {
  daily_log: {
    archived: false,
    _id: '5c83ab270d6d35000f9bb353',
    title: 'Daily Log: Mar 9, 2019',
    contents: [
      {
        status: 'INCOMPLETE',
        timesPostponed: 17,
        kind: 'task',
        children: [],
        _id: '5c83ab270d6d35000f9bb372',
        text: 'Add redux with tests'
      }
    ],
    createdAt: '2019-03-09T12:01:43.503Z',
    updatedAt: '2019-03-09T12:01:43.503Z'
  },
  monthly_log: {
    anytime: {
      archived: false,
      _id: '5c791fcb1f0e1e0016ca50bd',
      title: 'Monthly Log: Mar 2019',
      contents: [
        {
          status: 'INCOMPLETE',
          timesPostponed: 2,
          kind: 'task',
          children: [],
          _id: '5c791fcb1f0e1e0016ca50c4',
          text: 'Schedule a maid'
        }
      ],
      createdAt: '2019-03-01T12:04:27.827Z',
      updatedAt: '2019-03-09T05:34:42.686Z'
    },
    days: []
  },
  future_log: {
    anytime: {},
    months: [],
    days: []
  },
  collections: []
};

export const collectionsResponseNormalized = {
  entities: {
    bullets: {
      '5c791fcb1f0e1e0016ca50c4': {
        _id: '5c791fcb1f0e1e0016ca50c4',
        children: [],
        kind: 'task',
        status: 'INCOMPLETE',
        text: 'Schedule a maid',
        timesPostponed: 2
      },
      '5c83ab270d6d35000f9bb372': {
        _id: '5c83ab270d6d35000f9bb372',
        children: [],
        kind: 'task',
        status: 'INCOMPLETE',
        text: 'Add redux with tests',
        timesPostponed: 17
      }
    },
    collections: {
      '5c791fcb1f0e1e0016ca50bd': {
        _id: '5c791fcb1f0e1e0016ca50bd',
        archived: false,
        contents: ['5c791fcb1f0e1e0016ca50c4'],
        createdAt: '2019-03-01T12:04:27.827Z',
        title: 'Monthly Log: Mar 2019',
        updatedAt: '2019-03-09T05:34:42.686Z'
      },
      '5c83ab270d6d35000f9bb353': {
        _id: '5c83ab270d6d35000f9bb353',
        archived: false,
        contents: ['5c83ab270d6d35000f9bb372'],
        createdAt: '2019-03-09T12:01:43.503Z',
        title: 'Daily Log: Mar 9, 2019',
        updatedAt: '2019-03-09T12:01:43.503Z'
      }
    }
  },
  journal: {
    daily_log: '5c83ab270d6d35000f9bb353',
    future_log: { anytime: '', days: [], months: [] },
    monthly_log: { anytime: '5c791fcb1f0e1e0016ca50bd', days: [] }
  }
};

export const collectionResponse = {
  archived: false,
  _id: '5c83ab270d6d35000f9bb353',
  title: 'Daily Log: Mar 9, 2019',
  contents: [
    {
      status: 'INCOMPLETE',
      timesPostponed: 17,
      kind: 'task',
      children: [],
      _id: '5c83ab270d6d35000f9bb372',
      text: 'Add redux with tests'
    }
  ],
  createdAt: '2019-03-09T12:01:43.503Z',
  updatedAt: '2019-03-09T12:01:43.503Z'
};

export const collectionResponseNormalized = {
  entities: {
    bullets: {
      '5c83ab270d6d35000f9bb372': {
        _id: '5c83ab270d6d35000f9bb372',
        children: [],
        kind: 'task',
        status: 'INCOMPLETE',
        text: 'Add redux with tests',
        timesPostponed: 17
      }
    },
    collections: {
      '5c83ab270d6d35000f9bb353': {
        _id: '5c83ab270d6d35000f9bb353',
        archived: false,
        contents: ['5c83ab270d6d35000f9bb372'],
        createdAt: '2019-03-09T12:01:43.503Z',
        title: 'Daily Log: Mar 9, 2019',
        updatedAt: '2019-03-09T12:01:43.503Z'
      }
    }
  }
};

export const collectionResponseEmpty = {
  archived: false,
  _id: '5c83ab270d6d35000f9bb353',
  title: 'Daily Log: Mar 9, 2019',
  contents: [],
  createdAt: '2019-03-09T12:01:43.503Z',
  updatedAt: '2019-03-09T12:01:43.503Z'
};

export const collectionResponseEmptyNormalized = {
  entities: {
    bullets: {},
    collections: {
      '5c83ab270d6d35000f9bb353': {
        _id: '5c83ab270d6d35000f9bb353',
        archived: false,
        contents: [],
        createdAt: '2019-03-09T12:01:43.503Z',
        title: 'Daily Log: Mar 9, 2019',
        updatedAt: '2019-03-09T12:01:43.503Z'
      }
    }
  }
};

export const bulletResponse = {
  status: 'INCOMPLETE',
  timesPostponed: 17,
  kind: 'task',
  children: [],
  _id: '5c83ab270d6d35000f9bb372',
  text: 'Add redux with tests'
};

export const bulletResponseNormalized = {
  entities: {
    bullets: {
      '5c83ab270d6d35000f9bb372': {
        _id: '5c83ab270d6d35000f9bb372',
        children: [],
        kind: 'task',
        status: 'INCOMPLETE',
        text: 'Add redux with tests',
        timesPostponed: 17
      }
    }
  }
};

export const taskCompletedResponse = {
  status: 'COMPLETED',
  timesPostponed: 17,
  kind: 'task',
  children: [],
  _id: '5c83ab270d6d35000f9bb372',
  text: 'Add redux with tests'
};

export const taskCompletedResponseNormalized = {
  entities: {
    bullets: {
      '5c83ab270d6d35000f9bb372': {
        _id: '5c83ab270d6d35000f9bb372',
        children: [],
        kind: 'task',
        status: 'COMPLETED',
        text: 'Add redux with tests',
        timesPostponed: 17
      }
    }
  }
};

export const taskDiscardedResponse = {
  status: 'DISCARDED',
  timesPostponed: 17,
  kind: 'task',
  children: [],
  _id: '5c83ab270d6d35000f9bb372',
  text: 'Add redux with tests'
};

export const taskDiscardedResponseNormalized = {
  entities: {
    bullets: {
      '5c83ab270d6d35000f9bb372': {
        _id: '5c83ab270d6d35000f9bb372',
        children: [],
        kind: 'task',
        status: 'DISCARDED',
        text: 'Add redux with tests',
        timesPostponed: 17
      }
    }
  }
};

export const taskMigratedResponse = {
  status: 'MIGRATED',
  timesPostponed: 17,
  kind: 'task',
  children: [],
  _id: '5c83ab270d6d35000f9bb372',
  text: 'Add redux with tests'
};

export const taskMigratedResponseNormalized = {
  entities: {
    bullets: {
      '5c83ab270d6d35000f9bb372': {
        _id: '5c83ab270d6d35000f9bb372',
        children: [],
        kind: 'task',
        status: 'MIGRATED',
        text: 'Add redux with tests',
        timesPostponed: 17
      }
    }
  }
};

export const taskScheduledResponse = {
  status: 'SCHEDULED',
  timesPostponed: 17,
  kind: 'task',
  children: [],
  _id: '5c83ab270d6d35000f9bb372',
  text: 'Add redux with tests'
};

export const taskScheduledResponseNormalized = {
  entities: {
    bullets: {
      '5c83ab270d6d35000f9bb372': {
        _id: '5c83ab270d6d35000f9bb372',
        children: [],
        kind: 'task',
        status: 'SCHEDULED',
        text: 'Add redux with tests',
        timesPostponed: 17
      }
    }
  }
};
