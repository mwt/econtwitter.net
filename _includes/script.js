/* Get the issue and render it as HTML */
fetch("https://api.github.com/repos/mwt/econtwitter.net/issues/1", {
  headers: { Accept: "application/vnd.github.html+json" },
})
  .then((resp) => resp.json())
  .then(
    (issue) =>
      (document.getElementById("issue-content").innerHTML = issue.body_html)
  );

/* Get the comments from the issue and render them as HTML */
fetch(
  "https://api.github.com/repos/mwt/econtwitter.net/issues/1/comments?sort=created&direction=desc",
  {
    headers: { Accept: "application/vnd.github.html+json" },
  }
)
  .then((resp) => resp.json())
  .then((comments) =>
    /* Ignore comments that aren't mine
    (should be unnecessary since I closed it ) */
    comments.filter((comment) => comment.author_association === "OWNER")
  )
  .then((list) =>
    list.map(
      (comment) =>
        `<div class-"comment">
          <strong><time datetime="${comment.updated_at}">
            ${new Date(comment.updated_at).toLocaleString()}
          </time></strong>
          ${comment.body_html}
        </div>`
    )
  )
  .then(
    (html_list) =>
      (document.getElementById("issue-comments").innerHTML =
        html_list.join(" <hr> "))
  );
