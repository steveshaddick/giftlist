module FormatterConcern
  def format_money(value)
    value = value || 0
    value/100
  end


  def unformat_money(value)
    value = value || 0
    value * 100
  end
end
