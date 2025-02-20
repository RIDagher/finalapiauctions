$(document).ready(() => {
  $('#add-auction-form').submit((e) => {
    e.preventDefault();

    const newAuction = {
      itemCode: $('#itemCode').val().trim(),
      itemDesc: $('#itemDesc').val().trim(),
      sellerEmail: $('#sellerEmail').val().trim(),
    };

    if (!validateItem(newAuction)) return;

    $.ajax({
      url: '/api/auctions',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newAuction),
      success: function () {
        showMessage('success', 'Item added successfully!');
        $('#add-auction-form')[0].reset();
      },
      error: function (err) {
        showMessage(
          'danger',
          err.responseJSON?.message || 'Failed to add auction'
        );
      },
    });
  });

  function showMessage(type, text) {
    $('#alert-box')
      .removeClass('d-none alert-success alert-danger')
      .addClass(`alert alert-${type}`)
      .text(text);
  }

  function validateItem({ itemCode, itemDesc, sellerEmail }) {
    if (!/^[a-zA-Z0-9 .-]{2,20}$/.test(itemCode)) {
      showMessage(
        'danger',
        'Item code must be 2-20 characters (letters, numbers, spaces, dots, dashes).'
      );
      return false;
    }
    if (itemDesc.length < 1 || itemDesc.length > 200) {
      showMessage('danger', 'Description must be 1-200 characters long.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(sellerEmail)) {
      showMessage('danger', 'Invalid email format.');
      return false;
    }
    return true;
  }
});
