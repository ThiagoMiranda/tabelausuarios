deploy:
	rm -rf ./public/js/lib
	npm run build
	cp -a ./lib ./public
	cd ./public && \
	git init . && \
	git add . && \
	git commit -m "Deploy gh pages"; \
	git push "git@github.com:ThiagoMiranda/tabelausuarios.git" master:gh-pages --force && \
	rm -rf .git