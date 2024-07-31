@echo on

call tsc

call npm unlink ts-cli

call npm link
