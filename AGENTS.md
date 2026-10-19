<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep store claims in `src/config/site.ts` so page, cart and metadata remain consistent.
- Keep announcement timing in a browser-only component with pure timing helpers; preview countdowns must be labeled and must not imply an enforced offer expiration.
- Share gift icons and rating rendering through the store primitives to keep repeated visuals consistent.
