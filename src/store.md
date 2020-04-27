# Store Details

## Response

```json
  var response = {
    daily_log: {},
    monthly_log: {
      anytime: {},
      days: []
    },
    future_log: {
      anytime: {},
      months: [],
      days: []
    },
    ~~collections: []~~
  };
```

## Store Hierarchy

- journal
  - collections -> {}
  - daily_log -> collectionId
  - monthly_log
    - anytime -> collectionId
    - days -> [collectionId]
  - future_log
    - anytime -> collectionId
    - months -> [collectionId]
    - days -> [collectionId]

## Reducer Hierarchy

- journal

## Action Types

- Collection
  - ~~CREATE_COLLECTION~~
    - collections
  - ~~UPDATE_COLLECTION~~
    - collections
  - ~~DELETE_COLLECTION~~
    - collections
  - FETCH_COLLECTION
    - collections
  - FETCH_COLLECTIONS
    - collections
  - SET_DAILY_LOG
    - daily_log
  - SET_MONTHLY_LOG
    - monthly_log
  - SET_FUTURE_LOG
    - future_log
- Bullet
  - CREATE_BULLET
    - collections
  - UPDATE_BULLET
    - collections
  - DELETE_BULLET
    - collections
  - FETCH_BULLET
    - collections
  - COMPLETE_TASK
    - collections
  - MIGRATE_TASK
    - collections
  - SCHEDULE_TASK
    - collections
  - DISCARD_TASK
    - collections
  - RESET_TASK
    - collections
