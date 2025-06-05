shared_contract_publish:
	cd shared-contract && \
		pnpm run build && \
		pnpm version patch --no-git-tag-version && \
		pnpm publish --no-git-checks --registry=https://npm.pkg.github.com/