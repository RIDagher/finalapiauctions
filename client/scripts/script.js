$(document).ready(() => {
  fetchAuctions();

  function fetchAuctions() {
    $.get('/api/auctions', (data) => {
      let rows = data
        .map(
          (auction, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${auction.itemCode}</td>
          <td>${auction.itemDesc}</td>
          <td>${auction.sellerEmail}</td>
          <td>$${auction.lastBid || '0.00'}</td>
          <td>${auction.lastBidderEmail || 'No bids yet'}</td>
          <td>
            <button class="btn btn-warning bid-btn" 
              data-id="${auction.id}" data-item="${auction.itemCode}" 
              data-bid="${auction.lastBid || '0.00'}">Place Bid</button>
          </td>
        </tr>`
        )
        .join('');

      $('#auction-list').html(rows);
    }).fail((err) =>
      showMessage(
        'danger',
        err.responseJSON?.message || 'Failed to load auctions'
      )
    );
  }

  // Show bid form
  $(document).on('click', '.bid-btn', function () {
    $('#bid-section').removeClass('d-none');
    $('#bid-item').text($(this).data('item'));
    $('#bid-current').text($(this).data('bid'));
    $('#place-bid').data('id', $(this).data('id'));
  });

  $('#cancel-bid').click(() => $('#bid-section').addClass('d-none'));

  $('#place-bid').click(() => {
    const lastBid = $('#new-bid').val();
    const lastBidderEmail = $('#bidder-email').val();

    if (!validateBid(lastBid, lastBidderEmail)) return;

    $.ajax({
      url: `/api/auctions/${$('#place-bid').data('id')}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify({ lastBid, lastBidderEmail }),
      success: () => {
        showMessage('success', 'Bid placed successfully');
        fetchAuctions();
        $('#bid-section').addClass('d-none');
      },
      error: (err) =>
        showMessage(
          'danger',
          err.responseJSON?.message || 'Failed to place bid'
        ),
    });
  });

  function showMessage(type, text) {
    $('#alert-box')
      .removeClass('d-none alert-success alert-danger')
      .addClass(`alert alert-${type}`)
      .text(text);
  }

  function validateBid(lastBid, email) {
    if (isNaN(lastBid) || lastBid <= 0) {
      showMessage('danger', 'Bid must be a valid number greater than 0.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showMessage('danger', 'Invalid email format.');
      return false;
    }
    return true;
  }
});
