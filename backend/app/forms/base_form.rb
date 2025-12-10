class BaseForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  # errors.messagesではja.ymlの format: "%{attribute}%{message}" が使用できないため
  # full_messages_forで完全な日本語メッセージを値として設定する
  def json_errors
    errors.details.keys.each_with_object({}) do |attribute, hash|
      hash[attribute] = errors.full_messages_for(attribute)
    end
  end
end
