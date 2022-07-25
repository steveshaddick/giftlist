require 'faker'

User.all.each do |user|
  num_gifts = rand(5..10)
  (0..num_gifts).each do
    price_low = rand(5..50) * 100
    price_high = price_low + (rand(5..50) * 100)

    create_data = {
      title: "#{Faker::App.name} #{Faker::Coffee.blend_name}",
      description: Faker::Lorem.paragraph(sentence_count: 3, supplemental: true, random_sentences_to_add: 4),
      price_low: price_low,
      price_high: price_high,
      asker: user,
    }

    if rand() > 0.8
      create_data[:claimer] = User.find(rand(1..User.count))
    end

    Gift.create!(create_data)
  end
end
