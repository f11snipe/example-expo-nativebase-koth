import { HStack, Circle, Square, Box, Text, Icon } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export interface ResultDataProps {
  label: string;
  data: string | number;
}

export default function ResultData<T>(props: ResultDataProps) {
  return (
    <HStack space={2} justifyContent="space-between">
      <Icon as={MaterialCommunityIcons} name='crown' color="primary.600" size='md' />
      <Text>{props.data}</Text>
      <Text fontSize={'xs'}>{props.label}</Text>
    </HStack>
  );
}
