# Jets Project

This README would normally document whatever steps are necessary to get the application up and running.

Things you might want to cover:

* Dependencies
* Configuration
* Database setup
* How to run the test suite
* Deployment instructions


```
# migration
bundle exec jets dynamodb:migrate dynamodb/migrate/2020xxxxxx.rb
```

```
# run server
bundle exec jets server --host 0.0.0.0 --port 3000
```
