module FormatterConcern
  def format_money(value)
    value/100
  end


  def unformat_money(value)
    value * 100
  end
end
