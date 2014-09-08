PROJECT = "FashionId Addressbook"
TESTS = $(shell find test -type f -name "*.js")
TESTTIMEOUT = 5000
REPORTER = spec

all: install test server

test:
	@npm install
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) --timeout $(TESTTIMEOUT) $(TESTS)

install:
	npm install
 
clean: 
	rm -rf node_modules

update: 
	git pull --rebase; 
	npm install

server:  
	node server.js 
 
 
.PHONY: test install clean update server