## Socket messages

### User Stories

A user connects

### Game instance data (backend)
* list of users
* user scores
* track history
* current song
* current time
* current round


### Game object calls
server start
```
new Game()
startNewRound(track)
```

user join
```
newUser(id)
```

user leave
```
deleteUser()
```

user guess
```
guess()
```


### Messages

connection:

* current preview url
* current seek (time in song)
* scores
* track history
* chat history
* 