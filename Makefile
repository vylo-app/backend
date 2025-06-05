shared_contract_publish:
	cd shared-contract && \
		pnpm run build && \
		git add . && \
		(git commit -m "update shared contract" || echo "No changes to commit") && \
		git push && \
		pnpm version patch --no-git-tag-version && \
		pnpm publish --no-git-checks --registry=https://npm.pkg.github.com/