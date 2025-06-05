shared_contract_publish:
	cd shared-contract && \
	pnpm run build && \
	git add . && git commit -m "update shared contract" && git push && \
	pnpm publish --registry=https://npm.pkg.github.com/