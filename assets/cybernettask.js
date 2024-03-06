$(document).ready(function () {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    success: function (data) {
      var tableBody = $("#tableBody");
      data.forEach((post) => {
        var shortBody =
          post.body.length > 30
            ? post.body.substring(0, 30) + "..."
            : post.body;
        tableBody.append(`<tr>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${shortBody}</td>
                    <td>Loading...</td> <!-- Placeholder for comments -->
                </tr>`);

        var loader = $('<div class="loader"></div>');
        var articlesCell = tableBody.find("tr:last-child td:last-child");
        articlesCell.append(loader);

        $.ajax({
          url: `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
          method: "GET",
          success: function (comments) {
            var limitedComments = comments.slice(0, 3);
            var commentsText = limitedComments
              .map((comment) => comment.body)
              .join("<br>");
            articlesCell.html(commentsText);
          },
          error: function () {
            articlesCell.text("Error loading comments");
          },
        });
      });
    },   
  });
});
