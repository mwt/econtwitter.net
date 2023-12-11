/* Get the issue and render it as HTML */
fetch("https://api.github.com/repos/mwt/econtwitter.net/issues/1")
  .then((resp) => resp.json())
  .then((issue) => issue.body)
  .then(marked.parse)
  .then((html) => (document.getElementById("issue-content").innerHTML = html));

/* Get the comments from the issue and render them as HTML */
fetch("https://api.github.com/repos/mwt/econtwitter.net/issues/1/comments")
  .then((resp) => resp.json())
  .then((comments) =>
    /* Ignore comments that aren't mine */
    comments.filter((comment) => comment.author_association === "OWNER")
  )
  .then((list) =>
    /* Reverse the list so the newest comments are at the top */
    list.reverse().map(
      (comment) =>
        `
          <div class-"comment">
            <strong><time datetime="${comment.updated_at}">
              ${new Date(comment.updated_at).toLocaleString()}
            </time></strong>
            ${marked.parse(comment.body)}
          </div>
        `
    )
  )
  .then((html_list) => html_list.join("<hr>"))
  .then((html) => (document.getElementById("issue-comments").innerHTML = html));
