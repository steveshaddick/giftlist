require 'faker'

default_groups = [
  {
    title: "Shaddick Family",
    users: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
    ]
  },
  {
    title: "Other Group",
    users: [
      8,
      9,
      10,
      11,
    ]
  },

]

default_groups.each do |new_group|
  gift_group = GiftGroup.new({
    title: new_group[:title]
  })
  gift_group.save

  new_group[:users].each do |user_id|
    membership = Membership.new({
      user: User.find(user_id),
      gift_group: gift_group,
    })
    membership.save
  end
end
