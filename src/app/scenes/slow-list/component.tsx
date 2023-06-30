import React, { ReactElement, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface SlowListItemProps {
  title: string;
}

function SlowListItem({ title }: SlowListItemProps): ReactElement {
  // Comment useState and useEffect to improve performance
  const [, forceRender] = useState<object>();

  useEffect(() => {
    forceRender({});
  }, [title]);

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

interface SlowListProps {
  count: number;
}

export function Component({ count }: SlowListProps): ReactElement {
  const data = Array.from({ length: count }, (_, index) => index);

  // Use it to improve performance
  //return <FlatList data={data} renderItem={({ item }) => <SlowListItem key={item} title={`Item ${item}`} />} />

  return (
    <View>
      {data.map((item) => (
        <SlowListItem key={item} title={`Item ${item}`} />
      ))}
    </View>
  );
}
